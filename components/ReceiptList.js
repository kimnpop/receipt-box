import styled from '@emotion/styled';
import Title from 'components/page/Title';
import Subtitle from 'components/page/Subtitle';
import Layout from 'components/layout/Layout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import receiptApi from 'api/receipt';
import Receipt from './Receipt';

const ReceiptListPage = () => {
  const [receiptList, setReceiptList] = useState();
  useEffect(() => {
    const { getReceipts } = receiptApi();
    getReceipts().then((data) => setReceiptList(data.data.receiptList));
  }, []);

  if (!receiptList) return <Layout hideTop>loading...</Layout>;

  if (receiptList.length < 1)
    return (
      <Layout hideTop showLogo>
        <Title>등록된 영수증이 없어요</Title>
        <Subtitle>스마트폰 캡쳐화면도 등록할 수 있어요 🙂</Subtitle>
        <Link href='/upload'>
          <RegisterButton>영수증 등록하기</RegisterButton>
        </Link>
      </Layout>
    );

  return (
    <Layout hideTop showLogo>
      <Title>나의 영수증 보관함</Title>
      <ReceiptList>
        {receiptList.map((item, index) => (
          <Receipt item={item} key={index} />
        ))}
      </ReceiptList>
    </Layout>
  );
};

export default ReceiptListPage;

const ReceiptList = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RegisterButton = styled.a`
  background: var(--blue500);
  color: white;
  width: 200px;
  height: 60px;
  font-size: 16px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;