export interface MenuItem {
	title: string;
	path: string;
	icon: string;
}

export interface CounterState {
	count: number;
}

export interface Blog {
	id: string;
	title: string;
	createdDate: string;
	summary: string;
	link: string;
}