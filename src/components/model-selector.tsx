import { Models, selectedModel, setSelectedModel } from "../states/model";

export default function ModelSelector() {
    return (
        <div class="space-y-3 p-4 bg-gray-100 rounded-lg max-w-xs mx-auto">
            <h3 class="text-lg font-semibold text-gray-700">Select Model</h3>
            {(Object.keys(Models) as Array<keyof typeof Models>).map((key) => {
                const modelUrl = Models[key];
                return (
                    <label class="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="radio"
                            name="model"
                            value={modelUrl}
                            checked={selectedModel() === modelUrl}
                            onChange={() => setSelectedModel(modelUrl)}
                            class="form-radio h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
                        />
                        <span class="text-gray-700 capitalize">{key}</span>
                    </label>
                );
            })}
        </div>
    );
}