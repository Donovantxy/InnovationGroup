import * as express from 'express';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as child from 'child_process';

const app: express.Application = express();
const PORT = 5555;
const exec = child.exec;

console.log(__dirname);
const productList = fs.readFileSync(__dirname + '/products.json', 'utf8');
let products = {};
if( productList ) {
  products = JSON.parse(productList);
}

app.get('/product-list', (req: Request, res: Response) => {
  res.status(200).json(products);
});

app.get('/product-list/:id', (req: Request, res: Response) => {
  const product = products[req.params.id];
  if ( product ) {
    res.status(200).json({
      success: true,
      product
    });
    return;
  }
  res.status(404).json({
    success: false
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening at port - ${PORT}`);
  exec('npm run start', (error) => {
    if (error) {
      console.log(`ERROR ANGULAR\n${error}\n`);
      return;
    }
    console.log('Angular is running...');
  });
});
