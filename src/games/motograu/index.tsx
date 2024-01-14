import './index.css'

import React, { useContext, useEffect, useState } from 'react'
import Display from '@/games/motograu/componentss/display'
import Controls from '@/games/motograu/componentss/controls/crash-control'
import Navbar from '@/games/motograu/componentss/navbar'
import TransactionBar from '@/games/motograu/componentss/transaction-bar'
import Snackbar from '@/games/motograu/componentss/snackbar'
import Results from '@/games/motograu/componentss/results'
import Footer from '@/games/motograu/componentss/transaction-bar/footer'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import { SessionContext } from '@/core/providers/session.provider'
import { GameStatus } from '@/core/providers/enums/game-status'
import { getHowToPlay } from '@/core/helpers'
import { ChatBubbleLeftIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import If from '@/core/components/conditions/if'
import { Chat } from '@/games/motograu/componentss/chat'

function HomePage() {
  const HowToPlay = getHowToPlay("motograu")
  const [showModal, setShowModal] = useState<boolean>(false)
  const { setLoading } = useContext<any>(SessionContext)
  const { iframeRef, gameStatus, executeAction, balance, soundClick } = useContext<any>(CrashGameContext)
  const [showChat, setShowChat] = useState(false)

  const handleShowChat = () => {
    setShowChat(!showChat)
    soundClick()
  }

  useEffect(() => {
    iframeRef.current?.contentWindow.addEventListener(
      'instance-created',
      () => {
        setLoading(false)
        if (gameStatus == GameStatus.RUNNING)
          setTimeout(() => executeAction('start'), 1000)
      }
    )
  }, [iframeRef])

  return (
    <div className="flex min-h-screen bg-gradient-to-r motograu-game">
      <div className="flex w-full sm:gap-3 min-h-screen relative">
        <section className="flex flex-col h-full grow p-0">
          <div className="sticky top-0 w-full bg-gradient-to-r motograu-navbar z-[100]">
            <Navbar
              game="motograu"
              executeAction={executeAction}
              balance={balance}
            />
          </div>
          <div className="grid p-3 gap-3 grow rounded w-full grid-cols-12">
            <div className="col-span-12 grow lg:col-span-3 order-1">
              <Controls color="lime" position={'center'} />
            </div>

            <div className="col-span-12  lg:col-span-9 relative lg:order-2 lg:min-h-[468px]">
              <div className="flex gap-3 h-full flex-col">
                <div className="grow relative z-0">
                  <iframe
                    ref={iframeRef}
                    className="rounded-md overflow-hidden w-full h-full pointer-events-none min-h-[250px] sm:min-h-[300px]"
                    src="/motograu/index.html"
                  />
                  <div className="transform absolute top-14 w-full">
                    <Display />
                  </div>
                  <Snackbar />
                  <button
                    onClick={() => {
                      setShowModal(!showModal)
                      soundClick()
                    }}
                    className="btn btn-sm py-1 px-2 flex items-center border-none text-gray-200  gap-1 rounded-md capitalize text-sm sm:text-base font-normal mr-4 absolute top-1 left-1 bg-opacity-70"
                  >
                    <QuestionMarkCircleIcon className="h-5 w-5" />
                    <span className="hidden sm:inline">Como Jogar?</span>
                  </button>
                  <If condition={!showChat}>
                    <button
                      className="btn p-1 rounded-full absolute z-[5] top-2 right-2 sm:top-3 sm:right-3 bg-[#ff7700] hover:bg-[#d26200] border-none"
                      onClick={() => {
                        handleShowChat()
                        soundClick()
                      }}
                    >
                      <ChatBubbleLeftIcon  className="w-6 h-7 m-2 bg-opacity-50" />
                    </button>
                  </If>
                </div>
                <Results />
              </div>
              
            </div>
          </div>
          <div className='px-3 pb-8'>
            <TransactionBar />
          </div>
          <Footer />
        </section>
      </div>
      <Chat show={showChat} togleShowChat={handleShowChat} />
      <HowToPlay show={showModal} toggle={setShowModal} />
    </div>
  )
}

export default HomePage
