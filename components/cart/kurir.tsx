import { Checkbox, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useState } from 'react';
export default function Kurir({ data }: any) {
console.log(data)

    return (
        <div className='my-20'>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Pilihan</Th>
                            <Th>Services</Th>
                            <Th>Estimasi</Th>
                            <Th >Harga</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data && data.map((val: any, i: number) => (
                            <Tr key={i}>
                                <Td>
                                    <Checkbox
                                        colorScheme='green'
                                        size={'lg'}
                                    ></Checkbox>
                                </Td>
                                <Td>{val.description} ( {val.service} ) </Td>
                                <Td>{val.cost[0].etd}</Td>
                                <Td >{val.cost[0].value}</Td>
                            </Tr>
                        ))}

                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
}