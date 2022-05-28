import { Button, Checkbox, Input, Popover, Radio, Typography } from "antd";
import React, { useState } from "react";

const Filter = ({ setFilter, filterList, filterOptions }) => {
    const [filterPanelVisible, setFilterPanelVisible] = useState(false)
    const [currentFilter, setCurrentFilter] = useState('Filter')
    const [checkedList, setCheckedList] = useState();

    const statusOptions = ['Chưa nộp', 'Chưa chấm', 'Đã chấm'];

    const onChange = list => {
        setCheckedList(list);
    };

    let filterListHtml = filterOptions?.map((filter) => {
        let options = filter.values.map((value) => {
            return {
                label: value.d,
                value: value.v,
            }
        })
        return (
            <>
                <Typography.Title level={5}>{filter.display}:</Typography.Title>
                <Checkbox.Group options={options} onChange={onChange} />
            </>
        )
    })

    let filterPanel = (
        <>
            <Typography.Title level={5}>Name:</Typography.Title>
            <Input placeholder="Filter" style={{
                marginBottom: '5px'
            }} />
            {/* <Typography.Title level={5}>Status:</Typography.Title>
            <Checkbox.Group options={statusOptions} value={checkedList} onChange={onChange} /> */}
            {filterListHtml}
        </>
    )
    return (
        <Popover
            content={<a onClick={() => setFilterPanelVisible(false)} style={{
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