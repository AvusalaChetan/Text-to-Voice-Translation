import React, { type JSX } from 'react'
import { COLORS } from '../const/colors'

const Transcript = ({ transcript }: { transcript: string }): JSX.Element => {
  return (
  <>  <div
          className="w-full max-w-xl p-5 border-2 rounded-lg mt-auto"
          style={{
            borderColor: COLORS.border.primary,
            backgroundColor: "rgba(0, 212, 255, 0.05)",
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <label
              className="text-xs font-bold tracking-wider"
              style={{
                color: COLORS.text.muted,
              }}
            >
              LIVE TRANSCRIPT
            </label>
            <button
              className="bg-none border-none cursor-pointer text-sm font-bold"
              style={{
                color: COLORS.accent.cyan,
              }}
            >
              ⌃
            </button>
          </div>
  
          <div className="flex justify-between items-start gap-2.5">
            <p
              className="text-base leading-relaxed flex-1"
              style={{
                color: COLORS.text.cyan,
              }}
            >
              {transcript}{" "}
              <span
                className="cursor-pointer font-bold"
                style={{
                  color: COLORS.accent.cyan,
                }}
              >
                [▶ Play]
              </span>
            </p>
          </div>
        </div>
        </>
  )
}

export default Transcript