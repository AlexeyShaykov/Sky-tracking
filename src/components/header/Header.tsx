import { match } from 'path-to-regexp'
import { Link, useLocation } from 'react-router'

import { PAGES } from '@/config/pages.config'

import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { Heart } from '../animate-ui/icons/heart'

import { Button } from '../animate-ui/components/buttons/button';
import { AnimateIcon } from '../animate-ui/icons/icon'

import HeaderMenuItem from './HeaderMenuItem'
import { headerMenuData } from './header-menu.data'

const Header = () => {
	const location = useLocation()

	return (
		<div className='xs:flex-col xs:pb-4 bg-card p-2 sm:px-mini-element absolute top-7 left-1/2 flex w-4/12 -translate-x-1/2 items-center justify-between rounded-xl px-5 sm:rounded-lg lg:relative lg:top-0 lg:mb-5 lg:w-full z-10'>
			<div className='xs:flex-wrap xs:justify-center flex items-center gap-4 sm:gap-2'>
				<img
					src='/logo.svg'
					alt='Sky Track Logo'
					className='h-12 w-12 sm:h-10 sm:w-10'
				/>
				<nav>
					<ul className='flex items-center gap-5 sm:gap-3'>
						{headerMenuData.map(item => (
							<HeaderMenuItem
								key={item.href}
								item={item}
								isActive={!!match(item.href)(location.pathname)}
							/>
						))}
					</ul>
				</nav>
			</div>
			<div className='xs:mt-2 flex items-center gap-3 sm:gap-2'>
				<Button 
					asChild
					variant='secondary'
					size='icon'
				>
					<Link
						to={PAGES.FAVORITES}
					>
						<AnimateIcon animateOnHover>
							<Heart size={23} />
						</AnimateIcon>
					</Link>
				</Button>
				<ThemeToggle />
			</div>
		</div>
	)
}

export default Header

