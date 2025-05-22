interface FormProgressProps {
    progress: number
  }
  
  export function FormProgress({ progress }: FormProgressProps) {
    return (
      <div className="w-full bg-gray-100 rounded-full h-2.5 mb-6">
        <div
          className="bg-green-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    )
  }
  