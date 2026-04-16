import type { DatePickerProps } from 'antd';
import { Button, DatePicker, message } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useCallback, useRef, useState } from 'react';

const { RangePicker } = DatePicker;

// 定义返回类型
export interface UseDateRangePickerReturn {
  DateRangePicker: React.FC;
  getDateRange: () => [Dayjs, Dayjs];
}

// 自定义 hook，返回组件和操作方法
export function useDateRangePicker(
  onChange: (dates: [Dayjs, Dayjs]) => void,
): UseDateRangePickerReturn {
  // 存储上一次的错误状态，避免重复显示错误消息
  const lastErrorRef = useRef<number>(0);

  const [messageApi, contextHolder] = message.useMessage();
  // 时间范围
  const [timeRange, setTimeRange] = useState<
    'today' | 'yesterday' | '7day' | 'custom'
  >('today');
  // 时间范围选择器
  const [dateRange, setDateRangeState] = useState<[Dayjs, Dayjs]>([
    dayjs().startOf('day'),
    dayjs(),
  ]);

  // 时间范围选择器
  const handleTimeRangeChange = useCallback(
    (range: 'today' | 'yesterday' | '7day') => {
      setTimeRange(range);
      let start: Dayjs;
      let end: Dayjs = dayjs();
      switch (range) {
        case 'today':
          start = dayjs().startOf('day');
          break;
        case 'yesterday':
          start = dayjs().subtract(1, 'day').startOf('day');
          end = dayjs().subtract(1, 'day').endOf('day');
          break;
        case '7day':
          start = dayjs().subtract(6, 'day').startOf('day');
          break;
        default:
          start = dayjs().startOf('day');
      }
      // 日志
      console.log('时间范围类别变了', range);
      onChange([start, end]);
      setDateRangeState([start, end]);
    },
    [],
  );

  const handleDateRangeChange = useCallback(
    (dates: any) => {
      const now = Date.now();

      if (now - lastErrorRef.current < 600) {
        return;
      }
      lastErrorRef.current = now;
      if (dates && dates[0] && dates[1]) {
        const [start, end] = dates;
        console.log(
          'RangePicker的onChange',
          start.format('YYYY-MM-DD HH:mm:ss'),
          end.format('YYYY-MM-DD HH:mm:ss'),
        );
        const now = dayjs();

        // 校验 endTime 不能超过当前时间
        if (end.isAfter(now)) {
          const errorMessage = '结束时间不能超过当前时间';
          messageApi.error(errorMessage);
          return;
        }

        // 校验时间跨度不能超过7天
        if (end.diff(start, 'day') > 7) {
          const errorMessage = '时间跨度不能超过7天';
          messageApi.error(errorMessage);

          return;
        }
        setDateRangeState(dates);
        setTimeRange('custom');
        onChange(dates);
      }
    },
    [messageApi, onChange],
  );

  // Disabled 7 days from the selected date
  const disabled7DaysDate: DatePickerProps['disabledDate'] = (
    current,
    { from },
  ) => {
    if (from) {
      return Math.abs(current.diff(from, 'days')) >= 7;
    }
    return false;
  };

  // 内部组件
  const DateRangePickerComponent: React.FC = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Button
        type={timeRange === 'today' ? 'primary' : 'default'}
        onClick={() => handleTimeRangeChange('today')}
      >
        今日
      </Button>
      <Button
        type={timeRange === 'yesterday' ? 'primary' : 'default'}
        onClick={() => handleTimeRangeChange('yesterday')}
      >
        昨日
      </Button>
      <Button
        type={timeRange === '7day' ? 'primary' : 'default'}
        onClick={() => handleTimeRangeChange('7day')}
      >
        7日
      </Button>
      <div>
        <RangePicker
          status={timeRange === 'custom' ? 'error' : undefined}
          value={dateRange}
          onChange={handleDateRangeChange}
          showTime={true}
          disabledDate={disabled7DaysDate}
          format="YYYY-MM-DD HH:mm:ss"
          style={{ width: 380 }}
          renderExtraFooter={() => '请选择时间范围'}
        />
        {contextHolder}
      </div>
    </div>
  );

  // 返回组件和操作方法
  return {
    DateRangePicker: DateRangePickerComponent,
    getDateRange: () => dateRange,
  };
}
