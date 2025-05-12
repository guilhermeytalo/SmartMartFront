"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { processSalesData } from "@/utils/process-sales-data"
import { useEffect, useState } from "react"
import { parse } from 'papaparse'
import { ChartDataItem, ProductData } from "@domain/entities/Charts"

const colors = [
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))",
  "hsl(var(--chart-8))",
  "hsl(var(--chart-9))",
  "hsl(var(--chart-20))",
  "hsl(var(--chart-11))",
  "hsl(var(--chart-12))",
  "hsl(var(--chart-13))",
  "hsl(var(--chart-14))",
  "hsl(var(--chart-15))",
  "hsl(var(--chart-16))",
  "hsl(var(--chart-17))",
  "hsl(var(--chart-18))",
  "hsl(var(--chart-19))",
  "hsl(var(--chart-20))",
];

export function ProfitDonutChart() {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({ profit: { label: "Profit" } });
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/sales.csv');
        const csvText = await response.text();
        const salesData = await new Promise<ProductData[]>((resolve, reject) => {
          parse(csvText, {
            header: true,
            dynamicTyping: true,
            complete: (results) => {
              resolve(results.data as ProductData[]);
            },
            error: (error: Error) => reject(error)
          });
        });

        const { productData } = processSalesData(salesData) as { productData: ProductData[] };

        const preparedChartData: { product_id: string; profit: number; fill: string; label: string }[] = productData.map((product, index) => ({
          product_id: String(product.product_id),
          profit: product.total_profit,
          fill: colors[index % colors.length],
          label: `Product ${product.product_id}`
        }));

        console.log('Prepared Chart Data:', preparedChartData);

        const preparedChartConfig = {
          profit: {
            label: "Profit",
          },
          ...productData.reduce<Record<string, { label: string; color: string }>>((acc, product, index) => {
            acc[`product_${(product as ProductData).product_id}`] = {
              label: `Product ${(product as ProductData).product_id}`,
              color: colors[index % colors.length],
            };
            return acc;
          }, {})
        } satisfies ChartConfig;

        const calculatedTotalProfit = preparedChartData.reduce((acc, curr) => acc + curr.profit, 0);

        setChartData(preparedChartData);
        setChartConfig(preparedChartConfig);
        setTotalProfit(calculatedTotalProfit);
      } catch (error) {
        console.error('Error loading sales data:', error);
      }
    }

    loadData();
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Profit Distribution</CardTitle>
        <CardDescription>By Product</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {chartData.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="profit"
                nameKey="label"
                innerRadius={75}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {`R$ ${(totalProfit / 1000).toFixed(1)}k`}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total Profit
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex h-[250px] items-center justify-center">
            Loading profit data...
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Showing profit distribution across all products
        </div>
      </CardFooter>
    </Card>
  )
}