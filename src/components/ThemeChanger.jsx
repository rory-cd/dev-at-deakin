import { useTheme } from 'next-themes'
import DropDown from "@/components/DropDown"
import { RiArrowDropDownLine } from '@remixicon/react'

export default function ThemeChanger({ className = "" }) {
  const { theme, setTheme } = useTheme()

  const themeOptions = [
    {
      "key": 0,
      "value": "Light",
      "active": theme == 'light',
      "onClick": () => setTheme('light')
    },
    {
      "key": 1,
      "value": "Dark",
      "active": theme == 'dark',
      "onClick": () => setTheme('dark')
    },
    {
      "key": 2,
      "value": "System",
      "active": theme == 'system',
      "onClick": () => setTheme('system')
    }
  ];

  return (
    <DropDown options={themeOptions} className={`${className} inline group`}>
      <div className='flex flex-row'>
        <span className='text-(--clr-primary) group-hover:text-(--clr-primary-dark)'>
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </span>
        <RiArrowDropDownLine className='text-(--clr-primary)' />
      </div>
    </DropDown>
  );
}