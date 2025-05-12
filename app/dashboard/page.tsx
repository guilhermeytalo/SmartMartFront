'use client';
import { ProfitDonutChart } from '@components/charts/ProfitDonutChart';
import { SalesBarChart } from '@components/charts/SalesBarChart';

export default function DashboardPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-4">Welcome to the dashboard!</p>

            <div className="flex flex-wrap gap-4 mt-6">
                <div>
                    <SalesBarChart />
                </div>

                <div>
                    <ProfitDonutChart />
                </div>
            </div>
        </div>
    );
}