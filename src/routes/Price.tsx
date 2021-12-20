import ApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
import styled, { keyframes } from "styled-components";
import { fetchCoinHistory, fetchCoinInfo, fetchCoinTickers } from "../api";


const animationCompo = keyframes`
    0% {
        transform: none;
        opacity: 0;
    }
    1% {
        transform: translateY(-5px);
        opacity: 0.1;
    }
    100% {
        transform: none;
        opacity: 1;
    }
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #615e5e7f;
    padding: 10px 20px;
    border-radius: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    animation: ${ animationCompo } 0.5s linear forwards;
`;


const OverviewCenter = styled(Overview)`
    justify-content: center;
`;

const OverviewItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    span{
        margin-right: 10px;
    }
`;

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

interface ChartProps {
    coinId: string,
};

function Price({ coinId }: ChartProps){
    const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
    const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId), { refetchInterval: 5000, });
    
    return (
        <div>
            {tickersLoading ? ("Loading Price...") : (
            <>
                <OverviewCenter>
                    <OverviewItem>
                        <span>Price :</span>
                        <span>{tickersData?.quotes.USD.price}</span>
                    </OverviewItem>
                </OverviewCenter>
                <Overview>
                    <OverviewItem>
                        <span>Max Change rate in last 24h :</span>
                        <span>{tickersData?.quotes.USD.market_cap_change_24h}</span>
                    </OverviewItem>
                </Overview>
                <Overview>
                    <OverviewItem>
                        <span>Change rate (last 1 hours):</span>
                        <span>{tickersData?.quotes.USD.percent_change_1h}</span>
                    </OverviewItem>
                </Overview>
                <Overview>
                    <OverviewItem>
                        <span>Change rate (last 12 hours):</span>
                        <span>{tickersData?.quotes.USD.percent_change_12h}</span>
                    </OverviewItem>
                </Overview>
                <Overview>
                    <OverviewItem>
                        <span>Change rate (last 24 hours):</span>
                        <span>{tickersData?.quotes.USD.percent_change_24h}</span>
                    </OverviewItem>
                </Overview>
            </>
            )}
        </div>
    );
}

export default Price;