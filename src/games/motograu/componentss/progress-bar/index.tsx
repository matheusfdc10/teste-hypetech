import React from 'react'
import fontBungeeSpice from "@/assets/fonts/Bungee-Spice/BungeeSpice-Regular.ttf"

type Props = {
  value: number
  max: number
  color: string
  label?: string
}

const getBackgroundColor = (color: string) => {
  switch (color) {
    case 'blue':
      return 'bg-blue-600'
    case 'lime':
      return 'bg-[#28a909]'
    case 'yellow':
      return 'bg-yellow-400'
    case 'amber':
      return 'bg-amber-600'
    case 'red':
      return 'bg-red-700'
    case 'pink':
      return 'bg-pink-700'
    case 'rose':
      return 'bg-rose-700'
    case 'gray':
      return 'bg-gray-400'
    case 'orange':
      return 'bg-[#ff7700]';
  }
}

export default function ProgressBar({
  max,
  value,
  color,
  label = 'Preparando para empinar',
}: Props) {
  return (
    <div className="w-full relative flex flex-col gap-2 items-center">
      <small 
        className="font-black text-center text-lg sm:text-lg md:text-xl lg:text-2xl flex items-center justify-center uppercase drop-shadow font-bungeeSpice leading-tight"
        style={{
          WebkitTextStroke: '2px #3d3d3d',
          textShadow: '1px 2px 1px #000', 
        }}
        >
        {label}
      </small>
      <div className="w-full flex items-center bg-gray-600 bg-opacity-50 shadow border-opacity-50 rounded-md dark:bg-gray-700 p-1">
        <div
          className={`h-3 transition-all duration-100 rounded-[4px] bg-gradient-to-t from-[#ff7700] to-[#ffa300]`}
          style={{
            width: `${(value / max) * 100}%`,
            transitionTimingFunction: 'linear',
            transitionDuration: '990ms',
          }}
        />
      </div>
      
      <span
        className="text-4xl sm:text-6xl md:text-6xl lg:text-6xl font-bold  flex items-center justify-center text-[#ff7700] drop-shadow"
        style={{
          // WebkitTextStroke: '1px #3d3d3d',
          textShadow: '1px 1px 2px #000', 
        }}
      >
        {Math.abs(value)}s
      </span>
    </div>
  )
}
