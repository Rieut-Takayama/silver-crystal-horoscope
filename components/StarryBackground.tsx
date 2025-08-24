export default function StarryBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stars" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1" fill="white" opacity="0.3"/>
              <circle cx="25" cy="15" r="0.5" fill="white" opacity="0.5"/>
              <circle cx="45" cy="30" r="1" fill="white" opacity="0.3"/>
              <circle cx="15" cy="45" r="0.5" fill="white" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stars)"/>
        </svg>
      </div>
    </div>
  )
}