import { useEffect, useState } from 'react'
import {
  SCREEN_MOB,
  SCREEN_MOB_BIG,
  SCREEN_PC_SMALL,
  SCREEN_TABLET_BIG,
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
    isScreenMob: width <= SCREEN_MOB,
    isScreenMobBig: width < SCREEN_MOB_BIG && width >= SCREEN_MOB,
    isScreenPc: width >= SCREEN_PC_SMALL,
    isScreenPcSmall: width <= SCREEN_PC_SMALL && width >= SCREEN_MOB_BIG,
    isScreenTabletBig: width <= SCREEN_TABLET_BIG && width >= SCREEN_MOB_BIG,
  }
}
