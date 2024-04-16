export default class FormattaData
{
    static formattaData(data : Date) : string{
        const offset = data.getTimezoneOffset() * 60000;
        const dataConOffset = new Date(data.getTime() - offset);
        return dataConOffset.toISOString().split('T')[0];
    }
} 