import React, { useState, useEffect, useRef, useContext } from 'react'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import {
  QuestionMarkCircleIcon,
  Bars3Icon,
  ChatBubbleLeftIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'
import { getGameLogo, getHowToPlay } from '@/core/helpers'
import GameLimitsModal from '@/core/components/provably-fair/game-limits'
import { Chat } from '@/core/components/chat'

type Props = {
  game: string
  balance: string
  name: string
  executeAction: Function
  openChatHandler?: Function
}

export default function Navbar({
  game,
  balance,
  executeAction,
}: Props) {
  const HowToPlay = getHowToPlay(game)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showChat, setShowChat] = useState(false)
  const [showGameLimitsModal, setShowGameLimitsModal] =
    useState<boolean>(false)

  const [animationEnabled, setAnimationEnabled] = useState(true)
  const [musicEnabled, setMusicEnabled] = useState(true)
  const [audioContextAllowed, setAudioContextAllowed] = useState(true)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const {soundEnabled,
        setSoundEnabled,
        soundClick,
        playerName
        } = useContext(CrashGameContext)

  const handleSoundEnabled = (event) => {
    const { checked } = event.target
    executeAction(checked ? 'soundsOn' : 'soundsOff')
    setSoundEnabled(checked)
  }

  const handleMusicEnabled = (event) => {
    const { checked } = event.target

    executeAction(checked ? 'musicOn' : 'musicOff')
    setMusicEnabled(checked)
  }

  const handleAnimationEnabled = (event) => {
    const { checked } = event.target
    executeAction(checked ? 'animationOff' : 'animationOn')
    setAnimationEnabled(checked)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
    soundClick()
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)

    setTimeout(() => {
      if (window.AudioContext == false) {
        setAudioContextAllowed(false)
      }
    }, 2000)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const handleOutsideClick = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false)
    }
    setAudioContextAllowed(false)
  }

  const handleShowChat = () => {
    setShowChat(!showChat)
    soundClick()
  }

  const isMobileDevice =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

  return (
    <div className="h-20 border-b border-gray-600 bg-opacity-20 border-opacity-20">
      <div className="navbar mx-auto  my-auto px-3 sm:px-4 h-full flex items-center w-full justify-end">
        <h1 className="self-center h-full">{getGameLogo(game)}</h1>

        <div className="flex items-center ml-auto gap-2">
          {/* <button
            onClick={() => {
              setShowModal(!showModal)
              soundClick()
            }}
            className="btn btn-sm py-1 px-2 flex items-center text-gray-500 btn-warning gap-1 rounded-md capitalize text-sm sm:text-base font-normal mr-4"
          >
            <QuestionMarkCircleIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Como Jogar?</span>
          </button> */}

          <div className="text-base sm:text-lg text-center font-bold mr-2 flex justify-center items-center gap-1 border-2 border-gray-600 border-opacity-50 p-2 rounded-md">
            <CurrencyDollarIcon  className='w-6 h-6 text-[#ffc300] text-opacity-75 mr-1'/>
            <span className="player-currency">R$</span>{' '}
            <span className="balance">{balance}</span>
          </div>

          <div className="border-l h-6 border-gray-400 border-opacity-50" />

          <div className="dropdown dropdown-end flex items-center" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="btn btn-sm px-1 btn-ghost"
            >
              <Bars3Icon className="w-8 h-8 bg-opacity-50" />
            </button>

            {isDropdownOpen && (
              <div className="mt-2 menu menu-compact bg-[#1a242d] shadow-md rounded py-2 w-[280px] max-w-[300px] absolute top-[30px] right-[30px] z-20">
                <div className="flex gap-4 p-4">
                  <img
                    src="https://api.multiavatar.com/NOME.svg"
                    className="h-12 invert rounded-lg"
                  />
                  <div className="mt-1">
                    <p className="font-bold text-xs text-white">
                      {/* Nome do Jogador */}
                      {playerName}
                    </p>
                    <p className="text-xs flex mt-1">
                      <span className="block mt-1 mr-2 rounded-full bg-green-600 h-2 w-2"></span>{' '}
                      <span className="opacity-50">Online agora</span>
                    </p>
                  </div>
                </div>
                <div className="px-2 text-xs item">
                  <div className="form-control">
                    <label className="label hover:font-bold cursor-pointer">
                      <span className="label-text text-xs opacity-90">
                        Sons
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={soundEnabled}
                          onChange={handleSoundEnabled}
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer bg-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </label>
                  </div>
                </div>
                <div className="px-2 text-xs item">
                  <div className="form-control">
                    <label className="label hover:font-bold cursor-pointer">
                      <span className="label-text text-xs opacity-90">
                        Música
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={musicEnabled}
                          onChange={handleMusicEnabled}
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer bg-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </label>
                  </div>
                </div>
                {/*     {<div className="px-2 text-xs item">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text text-xs opacity-90">Animação</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          onChange={handleAnimationEnabled}
                          checked={animationEnabled}
                          className="sr-only peer"
                        />
                      <div className="w-8 h-4 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer bg-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </label>
                </div>
              </div>} */}

                <div
                  className="px-3 cursor-pointer py-3 hover:font-bold text-xs item"
                  onClick={() => {
                    setShowGameLimitsModal(!showGameLimitsModal)
                    soundClick()
                  }}
                >
                  <label className="cursor-pointer text-white text-xs opacity-75">
                    Limites de Jogo
                  </label>
                </div>

                <a
                  className="px-3 cursor-pointer py-3 hover:font-bold text-xs item"
                  href=""
                >
                  <label className="cursor-pointer text-white text-xs opacity-75">
                    Suporte ao jogador Hypetech
                  </label>
                </a>
              </div>
            )}
          </div>

          {/* <If condition={!showChat}>
            <button
              className="btn p-1 rounded-full absolute z-[5] top-24 right-4 sm:top-[6.5rem] sm:right-6 bg-[#ff7700] hover:bg-[#d26200] border-none"
              onClick={() => {
                handleShowChat()
                soundClick()
              }}
            >
              <ChatBubbleLeftIcon  className="w-6 h-7 m-2 bg-opacity-50" />
            </button>
          </If> */}
        </div>
      </div>

      <HowToPlay show={showModal} toggle={setShowModal} />

      <GameLimitsModal
        show={showGameLimitsModal}
        toggle={setShowGameLimitsModal}
      />

      <Chat show={showChat} togleShowChat={handleShowChat} />
      
    </div>
  )
}