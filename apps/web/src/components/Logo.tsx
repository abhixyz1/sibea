interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export default function Logo({ 
  size = 'md', 
  showText = true,
  className = '' 
}: LogoProps) {
  const sizeClasses = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9', 
    lg: 'h-10 w-10'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <img 
        src="/images/logo-malang.png" 
        alt="Logo Kota Malang" 
        className={`${sizeClasses[size]} object-contain`}
      />
      {showText && (
        <span className={`font-semibold text-gray-900 ${textSizeClasses[size]} hidden sm:inline`}>
          SIBEA Kota Malang
        </span>
      )}
    </div>
  )
}

