import React from 'react'
import { useMediaQuery } from 'react-responsive';

function useResolutions():{ isBigScreen:boolean, isMidScreen:boolean, isSmallScreen:boolean, isPhone:boolean} {
     const isBigScreen = useMediaQuery({minWidth: 1340})
     const isMidScreen = useMediaQuery({maxWidth: 1340})
     const isSmallScreen = useMediaQuery({maxWidth: 920})
     const isPhone = useMediaQuery({maxWidth: 640})

     return {
          isBigScreen,
          isMidScreen,
          isSmallScreen,
          isPhone
     }
}

export default useResolutions;