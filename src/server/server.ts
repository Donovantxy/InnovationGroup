import * as express from 'express';
import { Request, Response } from 'express';
import * as fs from 'fs';

const app: express.Application = express();
const PORT = 5555;

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
  // if (process.argv.includes('--withFrontend=1')) {
  //   exec('npm run start:frontend', (error) => {
  //     if (error) {
  //       console.log(`ERROR ANGULAR\n${error}\n`);
  //       return;
  //     }
  //     console.log('Angular is running...');
  //   });
  // }
});
