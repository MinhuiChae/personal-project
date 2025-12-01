module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff6a00',
          dark: '#c60f3f',
          darkest: '#a10931',
        },
        dark: {
          DEFAULT: '#1e293b', // 기본 배경 색상 : slate-800
          secondary: '#334155', // 하위 배경 색상 : slate-700
          selection: '#475569', // hover or row 선택시 색상 : slate-600
          disabled: '#475569', // disabled 색상 : slate-600
          border: '#475569', // border 등 영역 나눔 색상 :  slate-600
          gray: '#9ca3af', // gray-400
          white: '#ffffff', // 기본 글자 색상
          info: '#1E40AF', // 카드 select 색상 blue-800
          sky: '#1D4ED8', // info의 hover 색상 blue-700
          deep: '#0f172a', // slate-900
          half: '#64748b', // slate-500,
          'dark-orange': '#FF6B01',
          'linebtn-disable': '#384153',
          'linebtn-default': '#222939',
          'paging-current': '#222939',
          'linebtn-hover': '#D3D7DB',
          'text-linebtn-disable': '#6E7178',
          table: {
            'panel-header': '#19232D',
            'row-active': '#FF9C54',
          },
        },
      }
    },
  },
  plugins: [],
}