/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes :{
        'image':{
          '0%':{ transform : 'scaleX(0)'},
          '100%':{ transform : 'scaleX(1)'},
        },
        'container':{
          '0%':{ transform : 'scaleY(0)'},
          '100%':{ transform : 'scaleY(1)'},
        },
        'navbar':{
          '0%':{transform : 'scaleX(0)'},
          '100%':{transform : 'scaleX(1)'}
        },
        'card':{
          '0%':{opacity:0},
          '100%':{opacity:1},
        }
      },
      animation :{
        'image': 'image 1s ease-in-out forwards',
        'container': 'container 1.5s ease-in-out forwards',
        'navbar' :'navbar 1.5s ease forwards',
        'card' :'card 2.5s ease forwards',
      },
    },
  },
  plugins: [],
}

