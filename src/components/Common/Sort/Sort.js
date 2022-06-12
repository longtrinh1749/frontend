import { Button, Popover, Card, Radio } from "antd";
import React, { useRef, useState } from "react";

const Sort = ({ sortList, setSortList, setSort, sort, objectList, sortOptions }) => {
    const [sortPanelVisible, setSortPanelVisible] = useState(false)
    const [currentSort, setCurrentSort] = useState('Sort')
    // const [sortDirection, setSortDirection] = useState('asc')
    // const [sortOption, setSortOption] = useState()
    let sortDirection = useRef('asc')
    let sortOption = useRef()
    let sortOptionsHtml
    if (sortOptions.length > 0) {
        sortOptionsHtml = sortOptions.map((option, index) => {
            return (
                <Radio.Button key={index} value={option.value}>{option.display}</Radio.Button>
            )
        })
    }
    let sortPanel = (
        <>
            <b>Sort by:</b>
            <Radio.Group buttonStyle="solid" onChange={(e) => {
                // setSortOption(e.target.value)
                sortOption.current = e.target.value
            }}>
                {sortOptionsHtml}
            </Radio.Group>
            <b>Direction:</b>
            <Radio.Group buttonStyle="solid" onChange={(e) => {
                // setSortDirection(e.target.value)
                sortDirection.current = e.target.value
            }}>
                <Radio.Button value="asc">Asc</Radio.Button>
                <Radio.Button value="desc">Desc</Radio.Button>
            </Radio.Group>
        </>
    )
    const applySort = () => {
        // sortList.sort((a, b) => {
        //     let as = a.name.split(' ')
        //     let aFirstName = as[as.length - 1]
        //     let bs = b.name.split(' ')
        //     let bFirstName = bs[bs.length - 1]
        //     return aFirstName.localeCompare(bFirstName)
        // })
        // setSortList(sortList)
        setSort({
            type: sortOption.current,
            direction: sortDirection.current
        })
    }
    return (
        <Popover
            content={<a onClick={
                () => {
                    applySort()
                    setSortPanelVisible(false)
                }
            } style={{
                width: '100%',
                textAlign: 'center'
            }}>Apply</a>}
            title={sortPanel}
            trigger="click"
            visible={sortPanelVisible}
            onVisibleChange={(visible) => setSortPanelVisible(visible)}
        >
            <Button type="primary">{currentSort}</Button>
        </Popover>
    )
}

export default Sort