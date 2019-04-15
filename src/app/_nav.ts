interface NavAttributes {
    [propName: string]: any;
}
interface NavWrapper {
    attributes: NavAttributes;
    element: string;
}
interface NavBadge {
    text: string;
    variant: string;
}
interface NavLabel {
    class?: string;
    variant: string;
}

export interface NavData {
    name?: string;
    url?: string;
    icon?: string;
    badge?: NavBadge;
    title?: boolean;
    children?: NavData[];
    variant?: string;
    attributes?: NavAttributes;
    divider?: boolean;
    class?: string;
    label?: NavLabel;
    wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
    {
        name: 'Child Management',
        url: '/dashboard',
        icon: 'icon-speedometer',
        children: [
            {
                name: 'Add Child',
                url: '/dashboard/addchild/1',
                icon: 'icon-puzzle'
            },
            {
                name: 'Add Sponsor',
                url: '/dashboard/addsponsor/2',
                icon: 'icon-puzzle'
            }
        ]
    }
];
