import ApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchCoinHistory } from "../api";
import { isDarkAtom } from "../atoms";

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface ChartProps {
    coinId: string,
};

function Chart({coinId}: ChartProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), {refetchInterval: 10000,});
    const result = data?.map(price => {
        const x = price.time_close;
        const y = [ price.open,price.high,price.low, price.close];
        return {x,y};
    });
    return (
        <div>
            {isLoading ? ("Loading Chart...") : (
                <ApexCharts
                    type="candlestick"
                    series={[
                        {
                            name: "Price",
                            data: result,
                        },
                    ]}
                    options={{
                        theme: {
                            mode: isDark ? "dark" : "light",
                        },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        stroke: {
                            curve: "smooth",
                            width: 4,
                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            axisTicks: { show: false },
                            labels: { show: false },
                            type: "datetime",
                            categories: data?.map(price => price.time_close),
                        },
                        fill: {
                            type: "gradient",
                            gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
                        },
                        colors: ["#0fbcf9"],
                        tooltip: {
                            y: {
                                formatter: (value) => `$${value.toFixed(2)}`,
                            }
                        }
                    }}
                />
            )}
        </div>
    );
}

export default Chart;