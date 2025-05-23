import { useEffect, useState } from 'react'
import {
  SCREEN_PC_SMALL,
  SCREEN_PC,
  SCREEN_MOB,
  SCREEN_MOB_BIG,
  SCREEN_TABLET,
} from '../config'

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    width,
    isScreenMob: width >= SCREEN_MOB,
    isScreenMobBig: width >= SCREEN_MOB_BIG,
    isScreenTab: width >= SCREEN_TABLET,
    isScreenPcSmall: width >= SCREEN_PC_SMALL,
    isScreenPc: width >= SCREEN_PC,
  }
}
