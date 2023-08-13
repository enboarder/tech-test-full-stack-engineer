import { Table, Th, Td } from './styles';

export default function SearcResult({ data }) {
    return (
      <Table>
        <tr>
          <Th>Ship Type</Th>
          <Th>Weight</Th>
          <Th>Home Port</Th>
          <Th>Ship Name</Th>
          <Th>Class</Th>
          <Th></Th>
        </tr>
        {
          data.map(item => (
           <tr>
            <Td>{item.shipType}</Td>
            <Td>{item.weight}</Td>
            <Td>{item.homePort}</Td>
            <Td>{item.shipName}</Td>
            <Td>{item.class}</Td>
            <Td><input type="file" id={item.id} accept="image/png, image/jpeg" /></Td>
          </tr>
          ))
        }
    </Table>

    );
  }