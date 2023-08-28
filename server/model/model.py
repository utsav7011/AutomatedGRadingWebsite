from transformers import AutoTokenizer, AutoModel
import torch
from sklearn.metrics.pairwise import cosine_similarity

def runModel(str1 , str2):
    model_name_a2 = 'sentence-transformers/bert-base-nli-mean-tokens'
    tokenizer = AutoTokenizer.from_pretrained(model_name_a2)
    model_a2 = AutoModel.from_pretrained(model_name_a2)

    sentences_a2 = [
        str1, str2
    ]
    tokens_a2 = {'input_ids' : [],'attention_mask':[]}
    for sentence in sentences_a2:
        new_tokens = tokenizer.encode_plus(sentence,max_length=128,truncation=True,padding='max_length',return_tensors='pt')
        tokens_a2['input_ids'].append(new_tokens['input_ids'][0])
        tokens_a2['attention_mask'].append(new_tokens['attention_mask'][0])

    tokens_a2['input_ids'] = torch.stack(tokens_a2['input_ids'])
    tokens_a2['attention_mask'] = torch.stack(tokens_a2['attention_mask'])

    outputs_a2 = model_a2(**tokens_a2)
    outputs_a2.keys()

    embeddings_a2 = outputs_a2.last_hidden_state
    attention_a2 = tokens_a2['attention_mask']

    mask_a2 = attention_a2.unsqueeze(-1).expand(embeddings_a2.shape).float()
    mask_embeddings_a2 = embeddings_a2 * mask_a2

    summed_a2 = torch.sum(mask_embeddings_a2,1)
    counts_a2 = torch.clamp(mask_a2.sum(1),min=1e-9)

    mean_pooled_a2 = summed_a2 / counts_a2
    mean_pooled_a2 = mean_pooled_a2.detach().numpy()

    similar_value_a2 = cosine_similarity(
    [mean_pooled_a2[0]],
    mean_pooled_a2[1:]
    )

    print("Similarity Percentage = ",similar_value_a2[0][0]*100)
    return similar_value_a2[0][0]*100