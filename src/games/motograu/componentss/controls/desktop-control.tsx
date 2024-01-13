import React, { useState } from 'react'
import CrashForm from './crash/form'
import If from '@/core/components/conditions/if'
import { PlusIcon } from '@heroicons/react/24/outline'

type Props = {
  color: string
}

export default function DesktopControl({ color }: Props) {
  const [second, setSecond] = useState<boolean>(true)
  // className="w-full gap-3 justify-center flex flex-col sm:flex-row lg:flex-col
  return (
    <div className="w-full gap-3 grid grid-rows-1 sm:grid-rows-none sm:grid-cols-2 lg:grid-cols-none lg:grid-rows-2">
      <CrashForm
        color={color}
        secondEnabled={second}
        toggleSecond={setSecond}
        position="left"
      /> 

      <If condition={!second}>
        <div className="flex justify-center items-center">
          <button
            onClick={() => setSecond((old) => !old)}
            className={`bg-[#ffffff] bg-opacity-10 hover:bg-opacity-20  transition-all btn-xl rounded-full p-1 hidden sm:block`}
          >
            <PlusIcon className="h-16 w-16" />
          </button>
        </div>
      </If>

      <If condition={second}>
        <CrashForm
          color={color}
          hideSelf={setSecond}
          position="right"
        />
      </If>
    </div>
  )
}
