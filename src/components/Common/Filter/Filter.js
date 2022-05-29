import { Button, Checkbox, Input, Popover, Radio, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";

const Filter = ({ setFilter, filterList, filterOptions, refresh }) => {
    const [filterPanelVisible, setFilterPanelVisible] = useState(false)
    const [currentFilter, setCurrentFilter] = useState('Filter')
    const [checkedList, setCheckedList] = useState({});
    const nameFilter = useRef('')

    const statusOptions = ['Chưa nộp', 'Chưa chấm', 'Đã chấm'];

    const onChange = (child, list) => {
        checkedList[child] = list
        setCheckedList(checkedList);
    };

    let filterListHtml = filterOptions?.map((filter) => {
        let options = filter.childs.map((child) => {
            return {
                label: child.d,
                value: child.v,
            }
        })
        return (
            <>
                <Typography.Title level={5}>{filter.display}:</Typography.Title>
                <Checkbox.Group options={options} onChange={(list) => onChange(filter.value, list)} />
            </>
        )
    })

    const applyFilter = () => {
        console.log('checkedList', checkedList)
        checkedList['name'] = nameFilter.current
        setFilter(JSON.parse(JSON.stringify(checkedList)))
    }

    let filterPanel = (
        <>
            <Typography.Title level={5}>Name:</Typography.Title>
            <Input placeholder="Filter" style={{
                marginBottom: '5px'
            }} onChange={(e) => nameFilter.current = e.target.value}/>
            {/* <Typography.Title level={5}>Status:</Typography.Title>
            <Checkbox.Group options={statusOptions} value={checkedList} onChange={onChange} /> */}
            {filterListHtml}
        </>
    )

    useEffect(() => {
        
    }, [refresh])
    return (
        <Popover
            content={<a onClick={() => {
                applyFilter()
                setFilterPanelVisible(false)
            }} style={{
                width: '100%',
                textAlign: 'center'
            }}>Apply Filter</a>}
            title={filterPanel}
            trigger="click"
            visible={filterPanelVisible}
            onVisibleChange={(visible) => setFilterPanelVisible(visible)}
        >
            <Button type="primary">{currentFilter}</Button>
        </Popover>
    )
}

export default Filter