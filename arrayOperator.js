//ԭ��push����������push������ĳ���
var arr = [];
arr.push(1);
arr.push(2);
var myvar = arr.push(3);
console.log(myvar);//3
[].push.apply(arr,[4,5]);//ʵ��concat()
console.log(arr);//[1,2,3,4,5]
var obj = {};
[].push.call(obj,1);
console.log(obj);//{'0':1,length:1} �����pushԪ��ʱ�������length����

//ԭ��pop������ɾ�����һ��Ԫ�ز��������Ԫ��
arr.pop();//5

//ԭ��join,����һ���ַ�����������Ӳ�����Ĭ���Զ��ŷָ�
arr.join('');//��arrתΪ�ַ���
[].join.call('hello','-');//'h-e-l-l-o'

//ԭ��concat������һ������
arr.concat(['1','2','3']);//�����ַ���
arr.concat(1,2,3);//��������

//ԭ��shift,ɾ��һ����һ��Ԫ�ز����ظ�Ԫ��
arr.shift();

//ԭ��slice������ָ��λ����ɵ������飬ԭ���鲻��
var a = [1,2,3];
a.slice();//[1,2,3]
a.slice(0);//[1,2,3]
a.slice(1);//[2,3]
a.slice(1,2);//[2]
a.slice(-1);//[3],������������һ��Ԫ��
a.slice(4);//[]
a.slice(2,1);//[]
a.slice(2,6);//[3]

function aa(){
    var aug = [].slice.call(arguments);//ת��Ϊ������
}

//ԭ��splice���У�ɾ��ĳЩԪ�ز�������ЩԪ�أ����޸�ԭ����
//arr.shift() === arr.splice(0,1)
arr.splice(1);//��Ϊ��������
arr.splice(3,2);//�ӵ��ĸ�Ԫ�ؿ�ʼɾ��������ɾ�����ĸ��������Ԫ��
arr.splice(3,2,'2','3','4');//����Ϊ���������
arr.splice(3,0,'a','b');//������ĵ�3��λ�ò���'a','b'

//ԭ��map,����һ��������
//ԭ��forEach,û�з���ֵ