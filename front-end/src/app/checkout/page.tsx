import {
    Box,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { redirect } from "next/navigation";
import { Total } from "../../components/Total";
import { CheckoutForm } from "./CheckoutForm";

const products = [
    {
        id: "1",
        description: "dfasdfasd",
        category_id: "asdfasdhf",
        name: "Tablet",
        price: 1500,
        image_url: "https://source.unsplash.com/random/300x200",
    },
];

const cart = {
    items: [
        {
            product_id: "1",
            quantity: 2,
            total: 500,
        },
    ],
    total: 1000,
};

async function CheckoutPage() {
    if (cart.items.length === 0) {
        return redirect("/my-cart");
    }

    return (
        <Box>
            <Typography variant="h3">Checkout</Typography>
            <Grid2 container spacing={3}>
                <Grid2 xs={12} md={6}>
                    <CheckoutForm />
                </Grid2>
                <Grid2 xs={0} md={1}>
                    <Divider orientation="vertical" />
                </Grid2>
                <Grid2 xs={12} md={5}>
                    <Typography variant="h5">Resumo do pedido</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Produto</TableCell>
                                <TableCell>Qtd.</TableCell>
                                <TableCell>Preço</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.items.map((item, key) => {
                                const product = products.find(
                                    (product) => product.id == item.product_id
                                )!;
                                return (
                                    <TableRow key={key}>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>
                                            {new Intl.NumberFormat("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            }).format(item.total)}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "end",
                                        }}
                                    >
                                        <Total total={cart.total} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default CheckoutPage;
