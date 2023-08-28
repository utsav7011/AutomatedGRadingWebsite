import { usePopup } from "../context/popupContext";

export default function Popup({ children }: { children: React.ReactNode }) {
  const popup = usePopup();

  return (
    <>
      {popup.visible && 
        <div id="small-modal" tabIndex={-1} className="fixed grid bg-gray-200/50 place-content-center top-0 left-0 right-0 z-50 w-screen h-screen p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full">
        <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-5 border-b rounded-t">
                    <h3 className="text-xl font-medium text-gray-900">
                        {popup.text}
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" data-modal-hide="small-modal">
                        <svg onClick={() => {
                            popup.updateStatus(false);
                        }} className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-6 grid space-y-6">
                    <p className="text-base leading-relaxed text-gray-500">
                    Your quiz was submitted successfully and the average similarity is:
                    </p>
                    <p className="text-base grid leading-relaxed text-green-500 place-self-center">
                        {popup.avgSimilarity}
                    </p>
                </div>
            </div>
        </div>
    </div>
      }
      {children}
    </>
  );
}
