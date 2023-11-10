import react from 'react'
type countCategory = 'total' | 'acknowledge' | 'duplicate' | 'limitGrade'
type AlertSummaryResponseType = 'TOTAL' | 'ACKNOWLEDGE' | 'DUPLICATE' | 'LIMITGRADE'
interface AlertSummaryResponse{
    show: boolean
    TOTAL: number
    [key: string]: number | boolean
}

type AlertSummaryCountType = { 
    [key in countCategory]?: AlertSummary | number
}

interface AlertBreakDown{
    TOTAL: number
    [key: string]: number
}


interface AlertSummary{
    TOTAL_COUNT: number | AlertBreakDown
    ACKNOWLEDGE: number | AlertBreakDown 
    DUPLICATE: number
    LIMIT_GRADE: number
}


const summarySelector = (data: {alertSummary: AlertSummary}) => {
    const alertSummaryCount: AlertSummaryCountType = {}

    if (typeof data?.alertSummary?.TOTAL_COUNT === 'number') {
        alertSummaryCount.total = data.alertSummary.TOTAL_COUNT
    } else {
        
        if (data?.alertSummary?.TOTAL_COUNT?.TOTAL >0) {
            alertSummaryCount.total = {
                show: true
                ...data.alertSummary.TOTAL_COUNT
            }
        }

    }
    return alertSummaryCount
}

function returnCount(count: number):  number | string {
    return count !== null && count !== undefined && !isNaN(Number(count)) && count !== 0 ? count : '-'
}

function showTooltip(countData: AlertBreakDown | number): boolean {
    return typeof countData === 'number' ? false : countData.TOTAL > 0
}

const AlertSummaryCount = (props:{
    summaryDate: { data: { alertSummary: AlertSummary } },
    type: AlertSummaryResponseType
}) => {
    const {summaryDate, type} = props
    const countData= summaryDate.data.alertSummary[type]

    if(type === null || countData === null || countData === undefined) return null
    if(typeof countData === ){
        return <div>{returnCount(countDate)}</div>
    }

}