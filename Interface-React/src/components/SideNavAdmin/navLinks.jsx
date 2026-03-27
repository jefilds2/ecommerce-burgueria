import { ListChecksIcon, ListIcon, ListPlusIcon, MotorcycleIcon, ReceiptIcon } from "@phosphor-icons/react";


export const navLinks = [
    {
        id: 1,
        label: 'Pedidos',
        path: '/admin/pedidos',
        icon: <ReceiptIcon />,
    },
    {
        id: 2,
        label: 'Produtos',
        path: '/admin/produtos',
        icon: <ListIcon />,
    },
    {
        id: 3,
        label: 'Adicionar Produto',
        path: '/admin/novo-produto',
        icon: <ListPlusIcon />,
    },
    {
        id: 4,
        label: 'Gerenciar Categorias',
        path: '/admin/categorias',
        icon: <ListChecksIcon />,
    },
    {
        id: 5,
        label: 'Alterar Taxa de Entrega',
        path: '/admin/tax-delivery',
        icon: <MotorcycleIcon />,
    },
];