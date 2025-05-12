export function processSalesData(salesData: any[]) {
  const processedData = salesData.map(sale => ({
    ...sale,
    date: new Date(sale.date)
  }));

  const productStats = processedData.reduce((acc, sale) => {
    if (!acc[sale.product_id]) {
      acc[sale.product_id] = {
        product_id: sale.product_id,
        total_quantity: 0,
        total_profit: 0
      };
    }
    acc[sale.product_id].total_quantity += sale.quantity;
    acc[sale.product_id].total_profit += sale.total_price;
    return acc;
  }, {});

  const productData = Object.values(productStats).sort((a: any, b: any) => 
    a.product_id - b.product_id
  );

  const monthlyStats = processedData.reduce((acc, sale) => {
    const month = sale.date.toLocaleString('default', { month: 'short' });
    
    if (!acc[month]) {
      acc[month] = {
        month,
        quantity: 0,
        profit: 0
      };
    }
    acc[month].quantity += sale.quantity;
    acc[month].profit += sale.total_price;
    return acc;
  }, {});

  const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyData = Object.values(monthlyStats).sort((a: any, b: any) => 
    monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
  );

  return {
    productData,
    monthlyData
  };
}