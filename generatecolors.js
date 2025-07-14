// https://coolors.co/b4b8ab-153243-c5dae7-d7ebad-eef0eb
const a = 
  { 
  'alabaster': { DEFAULT: '#eef0eb', 100: '#313629', 200: '#626c52', 300: '#919e7f', 400: '#c0c7b5', 500: '#eef0eb', 600: '#f1f3ef', 700: '#f5f6f3', 800: '#f8f9f7', 900: '#fcfcfb' }, 
  'ash_gray': { DEFAULT: '#b4b8ab', 100: '#252721', 200: '#4a4d42', 300: '#6f7463', 400: '#929886', 500: '#b4b8ab', 600: '#c4c7bd', 700: '#d3d5cd', 800: '#e1e3de', 900: '#f0f1ee' }, 
  'columbia_blue': { DEFAULT: '#c5dae7', 100: '#192f3c', 200: '#335e79', 300: '#4d8db4', 400: '#89b3ce', 500: '#c5dae7', 600: '#d1e1ec', 700: '#dce9f1', 800: '#e8f0f5', 900: '#f3f8fa' }, 
  'prussian_blue': { DEFAULT: '#153243', 100: '#040a0d', 200: '#08141a', 300: '#0c1e28', 400: '#112735', 500: '#153243', 600: '#296282', 700: '#3e92c2', 800: '#7eb6d6', 900: '#bfdbeb' }, 
  'tea_green': { DEFAULT: '#d7ebad', 100: '#324210', 200: '#648320', 300: '#96c530', 400: '#b8db6b', 500: '#d7ebad', 600: '#dfefbd', 700: '#e7f3ce', 800: '#eff7de', 900: '#f7fbef' }, 
    
  }
  
  const m = [
    'background',
    'secondary',
    'foreground',
    'third',
    'bright'
    ]
  
  
  let colors = ''
  Object.keys(a).map((i, index) => {
    const k = 
    // const k1 = k.split("_").join("-")
    Object.keys(a[i]).map((n)=> {
      
      let j = '-'
      let o =  '; \n'
      if(n.includes('DEFAULT')){
        j = ''
        o = ";\n \n"
      }
      colors += '--color-'+m[index]+j+n.split('DEFAULT').join('')+":"+a[i][n]+o
    })
    
    
  })
    console.log(colors)
// CHOICE 1
    // --color-background-100:#313629; 
    // --color-background-200:#626c52; 
    // --color-background-300:#919e7f; 
    // --color-background-400:#c0c7b5; 
    // --color-background-500:#eef0eb; 
    // --color-background-600:#f1f3ef; 
    // --color-background-700:#f5f6f3; 
    // --color-background-800:#f8f9f7; 
    // --color-background-900:#fcfcfb; 
    // --color-background:#eef0eb;
     
    // --color-secondary-100:#040a0d; 
    // --color-secondary-200:#08141a; 
    // --color-secondary-300:#0c1e28; 
    // --color-secondary-400:#112735; 
    // --color-secondary-500:#153243; 
    // --color-secondary-600:#296282; 
    // --color-secondary-700:#3e92c2; 
    // --color-secondary-800:#7eb6d6; 
    // --color-secondary-900:#bfdbeb; 
    // --color-secondary:#153243;
     
    // --color-foreground-100:#070d11; 
    // --color-foreground-200:#0e1b23; 
    // --color-foreground-300:#162834; 
    // --color-foreground-400:#1d3645; 
    // --color-foreground-500:#244356; 
    // --color-foreground-600:#3b6e8d; 
    // --color-foreground-700:#5b96ba; 
    // --color-foreground-800:#92b9d1; 
    // --color-foreground-900:#c8dce8; 
    // --color-foreground:#244356;
     
    // --color-third-100:#252721; 
    // --color-third-200:#4a4d42; 
    // --color-third-300:#6f7463; 
    // --color-third-400:#929886; 
    // --color-third-500:#b4b8ab; 
    // --color-third-600:#c4c7bd; 
    // --color-third-700:#d3d5cd; 
    // --color-third-800:#e1e3de; 
    // --color-third-900:#f0f1ee; 
    // --color-third:#b4b8ab;
     
    // --color-bright-100:#3b4e14; 
    // --color-bright-200:#769d27; 
    // --color-bright-300:#a9d452; 
    // --color-bright-400:#d0e7a0; 
    // --color-bright-500:#f7fbef; 
    // --color-bright-600:#f8fcf2; 
    // --color-bright-700:#fafdf5; 
    // --color-bright-800:#fcfdf8; 
    // --color-bright-900:#fdfefc; 
    // --color-bright:#f7fbef;