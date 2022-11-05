import React from 'react'
import AppBody from '../../components/share/app/AppBody'

const detail = () => {
  return (
    <AppBody
        secondarynav={[
            {name: "Like or Nope", to: "/restaurant"},
            {name: "My Favorite", to: "/restaurant/favorite"},
            {name: "My History", to: "/restaurant/history"},
        ]}
    >

    </AppBody>
  )
}

export default detail