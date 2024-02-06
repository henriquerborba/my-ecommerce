import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { Order, OrderStatus } from "../../models";

const orders: Order[] = [
    {
        id: "1",
        items: [
            {
                id: 1,
                product: {
                    id: "1",
                    description: "dfasdfasd",
                    category_id: "asdfasdhf",
                    name: "Tablet",
                    price: 1500,
                    image_url: "https://source.unsplash.com/random/300x200",
                },
                quantity: 2,
                price: 500,
            },
        ],
        status: OrderStatus.PENDING,
        created_at: "2021-10-10T00:00:00",
        total: 1000,
    },
];

async function MyOrdersListPage() {
    return (
        <Box>
            <Typography variant="h4">Meus pedidos</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Data</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => {
                        return (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>
                                    {new Date(
                                        order.created_at
                                    ).toLocaleDateString("pt-BR")}
                                </TableCell>
                                <TableCell>
                                    {new Intl.NumberFormat("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    }).format(order.total)}
                                </TableCell>
                                <TableCell>
                                    {order.status === OrderStatus.PENDING ? (
                                        <Typography
                                            variant="h5"
                                            sx={{ color: "warning.main" }}
                                        >
                                            ⏳
                                        </Typography>
                                    ) : order.status === OrderStatus.PAID ? (
                                        <Typography
                                            variant="h5"
                                            sx={{ color: "success.main" }}
                                        >
                                            ✔
                                        </Typography>
                                    ) : (
                                        <Typography
                                            variant="h5"
                                            sx={{ color: "error.main" }}
                                        >
                                            ✖
                                        </Typography>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        href={`/my-orders/${order.id}`}
                                    >
                                        Detalhes
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Box>
    );
}

export default MyOrdersListPage;
