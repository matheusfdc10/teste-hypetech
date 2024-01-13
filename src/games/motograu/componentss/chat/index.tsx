import React, { ElementRef, useCallback, useContext, useEffect, useRef, useState } from 'react'

import If from '@/core/components/conditions/if'

import EmojiPicker, {
  Theme,
  Categories,
  EmojiClickData,
} from 'emoji-picker-react'
import { FaceSmileIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import { IGameMessage } from '@/core/providers/interfaces/game-message.interface'
import { dateToHumanReadable } from '@/core/helpers/date'

type Props = {
  show: boolean
  togleShowChat: Function
}

export const Chat = ({ show, togleShowChat }: Props) => {
  const { messages, sendMessage, session } =
    useContext(CrashGameContext)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [message, setMessage] = useState<string>('')

  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    event.stopPropagation()
    setMessage(message + ' ' + emojiData.emoji)
  }

  function handleShowEmojiPicker(e: MouseEvent) {
    e.stopPropagation()

    setShowEmojiPicker(!showEmojiPicker)
  }

  const attemptSendMessage = () => {
    const parsed = message.trim()
    setShowEmojiPicker(false)

    if (parsed.length > 0) {
      sendMessage(message)
      setMessage('')
    }
  }

  const handleMessage = (e) => {
    if (e.key && e.key.toUpperCase() == 'ENTER') attemptSendMessage()
    else setMessage(e.target.value)
  }

  const bottomRef = useRef<ElementRef<"div">>(null);

  const scrollToBottom = useCallback(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "auto",
      });
    }
  }, [messages.length, show]);

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])


  return (
    <If condition={show}>
      <div className="w-80 mt-0 py-2 mb-44 px-2 border border-gray-700 border-opacity-50 text-sm rounded-lg bg-black backdrop-blur-sm bg-opacity-30 chat-container fixed right-0 z-50 top-20 h-[50%] sm:h-[60%] md:h-[60%] lg:h-[60%] shadow-lg">
        <div className="flex flex-col relative gap-3 h-full">
          <div className='w-full flex justify-end'>
            <button onClick={() => togleShowChat()}
              className="btn border-none btn-xs bg-[#ffffff] bg-opacity-10 hover:bg-opacity-95 btn-circle px-1 mt-1"
            >
              <XMarkIcon className="w-5 h-5 text-opacity-80 "/>
            </button>
          </div>
          <div  className="p-2 flex-shrink-1 flex-grow basis-0  overflow-y-scroll scrollbar-w-0 scrollbar-track-gray-400 scrollbar-thumb-gray-600 scrollbar scrollbar-track-rounded scrollbar-thumb-rounded">
            {messages.map((data: IGameMessage, idx: number) => {
              return (
                <>
                  <If condition={data.userId == session.userId}>
                    <div className="chat chat-end" key={idx}>
                      <div className="chat-image avatar">
                        <div className="w-5 rounded-full">
                          <img src="https://www.fiscalti.com.br/wp-content/uploads/2021/02/default-user-image.png" />
                        </div>
                      </div>

                      <div className="chat-bubble min-h-0">
                        {data.message}
                      </div>
                      <div className="chat-footer text-xs opacity-50">
                        {dateToHumanReadable(data.createdAt)}
                      </div>
                    </div>
                  </If>

                  <If condition={data.userId != session.userId}>
                    <div className="chat chat-start" key={idx}>
                      <div className="chat-image avatar">
                        <div className="w-5 rounded-full">
                          <img src="https://www.fiscalti.com.br/wp-content/uploads/2021/02/default-user-image.png" />
                        </div>
                      </div>
                      <div className="chat-bubble min-h-0">
                        {data.message}
                      </div>
                      <div className="chat-footer text-xs opacity-50">
                        {dateToHumanReadable(data.createdAt)}
                      </div>
                    </div>
                  </If>
                  <div ref={bottomRef}></div>
                </>
              )
            })}
          </div>

          <div className="sticky  bottom-2">
            <If condition={showEmojiPicker}>
              <div className="absolute bottom-10 w-full">
                <EmojiPicker
                  onEmojiClick={onClick}
                  autoFocusSearch={false}
                  height={'300px'}
                  width={'100%'}
                  previewConfig={{
                    showPreview: false,
                  }}
                  theme={Theme.DARK}
                  searchDisabled
                  // skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
                  // height={350}
                  // width="50%"
                  // emojiVersion="0.6"
                  // lazyLoadEmojis={true}
                  // previewConfig={{
                  //   defaultCaption: 'Pick one!',
                  //   defaultEmoji: '1f92a', // 🤪
                  // }}
                  // suggestedEmojisMode={SuggestionMode.RECENT}
                  skinTonesDisabled
                  // searchPlaceHolder="Filter"
                  // defaultSkinTone={SkinTones.MEDIUM}
                  // emojiStyle={EmojiStyle.NATIVE}
                  categories={[
                    {
                      name: 'Smiles & Emotions',
                      category: Categories.SMILEYS_PEOPLE,
                    },
                    {
                      name: 'Fun and Games',
                      category: Categories.ACTIVITIES,
                    },

                    {
                      name: 'Flags',
                      category: Categories.FLAGS,
                    },
                  ]}
                />
              </div>
            </If>
            <div className="form-control">
              <div className="input-group">
                <button
                  className="btn btn-sm"
                  onClick={(e) => handleShowEmojiPicker(e)}
                >
                  <FaceSmileIcon className="w-4 h-4" />
                </button>
                <input
                  className="input input-sm w-full focus:outline-1 focus:outline-offset-0 focus:opacity-90"
                  value={message}
                  onChange={handleMessage}
                  onKeyDown={handleMessage}
                />

                <button
                  className="btn btn-sm capitalize"
                  onClick={attemptSendMessage}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </If>
  )
}
