export default function SearcResult({ data }) {
    return (
      <table>
        <tr>
          <th scope="col">Ship Type</th>
          <th scope="col">Weight</th>
          <th scope="col">Home Port</th>
          <th scope="col">Ship Name</th>
          <th scope="col">Class</th>
          <th scope="col"></th>
        </tr>
        {
          data.map(item => (
           <tr>
            <th scope="row">{item.shipType}</th>
            <td>{item.weight}</td>
            <td>{item.homePort}</td>
            <td>{item.shipName}</td>
            <td>{item.class}</td>
          </tr>
          ))
        }
    </table>

    );
  }