"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { processSalesData } from "@/utils/process-sales-data"
import { useEffect, useState } from "react"

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))",
  "hsl(var(--chart-8))",
  "hsl(var(--chart-9))",
  "hsl(var(--chart-10))",
];

export function ProfitDonutChart() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartConfig, setChartConfig] = useState<ChartConfig>({ profit: { label: "Profit" } });
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/sales.csv');
        const csvText = await response.text();
        
        const salesData = await new Promise<any[]>((resolve, reject) => {
          const { parse } = require('papaparse');
          parse(csvText, {
            header: true,
            dynamicTyping: true,
            complete: (results: any) => {
              resolve(results.data);
            },
            error: (error: any) => reject(error)
          });
        });

        const { productData } = processSalesData(salesData);

        const preparedChartData = productData.map((product: any, index: number) => ({
          product_id: product.product_id,
          profit: product.total_profit,
          fill: colors[index % colors.length],
          label: `Product ${product.product_id}`
        }));

        const preparedChartConfig = {
          profit: {
            label: "Profit",
          },
          ...productData.reduce((acc: Record<string, any>, product: any, index: number) => {
            acc[`product_${product.product_id}`] = {
              label: `Product ${product.product_id}`,
              color: colors[index % colors.length],
            };
            return acc;
          }, {} as Record<string, any>)
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
                innerRadius={60}
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
                            ${(totalProfit / 1000).toFixed(1)}k
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