import React, { useContext, useEffect, useState } from 'react'
import ProgressBar from '@/games/motograu/componentss/progress-bar'
import If from '@/core/components/conditions/if'
import { GameStatus } from '@/core/providers/enums/game-status'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'

type Props = {
  color?: string
}

export default function Display({ color }: Props) {
  const { startTimeout, gameStatus, multiplier } =
    useContext<any>(CrashGameContext)

  return (
    <div className="absolute top-6 pointer-events-none left-0 flex flex-col gap-3 justify-center items-center w-full h-full">
      <If condition={gameStatus == GameStatus.IDLE}>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-44 sm:w-72 md:w-80 lg:w-96">
            <ProgressBar
              max={10}
              value={startTimeout}
              color={color}
            />
          </div>
        </div>
      </If>

      <If condition={gameStatus == GameStatus.RUNNING}>
        <div className="relative flex justify-center items-center">
          <h1
            className="text-6xl md:text-6xl lg:text-6xl font-black text-[#531e53] drop-shadow"
            style={{
              // WebkitTextStroke: '0.4px #fff',
              textShadow: '1px 1px 1px #fff', 
            }}
          >
            {multiplier?.toFixed(2)}x
          </h1>
        </div>
      </If>

      <If condition={gameStatus == GameStatus.MAINTENANCE}>
        <div className="relative flex justify-center items-center">
          <h1
            className="text-2xl md:text-3xl uppercase lg:text-3xl font-bold text-red-600 drop-shadow"
            style={{
              // WebkitTextStroke: '1px #000',
              textShadow: '1px 1px 2px #000', 
            }}
          >
            Em manutenção!
          </h1>
        </div>
      </If>

      <If condition={gameStatus == GameStatus.GAME_OVER}>
        <h1
          className="text-2xl sm:text-2xl text-gray-200 font-extrabold uppercase font-bungeeSpice"
          style={{
            // WebkitTextStroke: '1px #000',
            textShadow: '1px 2px 1px #000', 
          }}
        >
          O piloto caiu!
        </h1>
        <h1
          className={`text-6xl md:text-6xl lg:text-6xl font-bold text-red-600 drop-shadow`}
          style={{
            // WebkitTextStroke: '0.6px #000',
            textShadow: '1px 1px 2px #000', 
          }}
        >
          {multiplier.toFixed(2)}x
        </h1>
      </If>
    </div>
  )
}
