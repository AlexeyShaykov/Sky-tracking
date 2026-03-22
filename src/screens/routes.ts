import { PAGES }  from '@/config/pages.config'

import Favorites from './favorites/Favorites'
import Home from './home/Home'
import AboutUs from './about-us/AboutUs'
import Contacts from './contacts/Contacts'

export const ROUTES = [
	{
		component: Home,
		path: PAGES.HOME
	},
	{
		component: AboutUs,
		path: PAGES.ABOUT
	},
	{
		component: Contacts,
		path: PAGES.CONTACTS
	},
	{
		component: Favorites,
		path: PAGES.FAVORITES
	}
]
