export default class FormattaData
{
    static formattaData(data : string) : string{
        if(data == null)
        {
            return ""
        }
        const newData = new Date(data)
        const offset = newData.getTimezoneOffset() * 60000;
        const dataConOffset = new Date(newData.getTime() - offset);
        return dataConOffset.toISOString().split('T')[0];
    }
} 