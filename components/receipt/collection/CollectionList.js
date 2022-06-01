import { css } from '@emotion/react';
import styled from '@emotion/styled';
import CollectionSelector from './CollectionSelector';

const CollectionList = ({
  isOpen,
  collections,
  selectedCollectionId,
  handleCreateCollectionButtonClick,
  handleSelectedCollectionChange,
  handleOrderChange,
  orderValue
}) => {
  const handleSelectorClick = (collectionId) => {
    handleSelectedCollectionChange(collectionId);
  };

  return (
    <Container isOpen={isOpen}>
      <ListContainer>
        {collections.map((collection, index) => (
          <CollectionSelector
            key={`category_${index}`}
            isSelected={selectedCollectionId === collection.id}
            isCollectionListOpen={isOpen}
            onClick={handleSelectorClick}
            collection={collection}
          />
        ))}
        <CreateCollectionButton
          isCollectionListOpen={isOpen}
          onClick={handleCreateCollectionButtonClick}
        >
          +
        </CreateCollectionButton>
      </ListContainer>
      <OrderSelect>
        <select
          value={orderValue}
          onChange={handleOrderChange}
        >
          {[
            '구매일자순',
            '상품명순',
            '구매가순',
            '등록순',
            '별명순'
          ].map((order, idx) => {
            return <option key={`order__${idx}`} value={order} defaultValue={orderValue === order}>{order}</option>  
          })}
        </select>
      </OrderSelect>
    </Container>
  );
};

export default CollectionList;

const Container = styled.div`
  width: 100%;
  display: flex;
  overflow-y: clip;
  transition: 0.4s all;
  gap: 8px;

  ${(props) =>
    props.isOpen
      ? css`
          height: 48px;
          padding-bottom: 48px;
        `
      : css`
          height: 0;
        `}
`;

const ListContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 8px;
  overflow-x: scroll;

  height: 48px;
`

const CreateCollectionButton = styled.button`
  white-space: nowrap;
  padding: 4px 16px;
  height: 32px;
  border: 1px solid var(--grey400);
  border-radius: 12px;
  opacity: ${(props) => (props.isCollectionListOpen ? 1 : 0)};
  transition: 0.4s all;
  display: flex;
  align-items: center;
  position: relative;

  img {
    width: 16px;
    padding-left: 4px;
  }
`;

const OrderSelect = styled.div`
  select {
    width: 110px;
    height: 32px;
    font-size: 14px;
    padding: 4px 16px;
    border-radius: 12px;
    border: 1px solid var(--grey400);
    appearance: none;
    background-color: white;
    background-image: url('/icons/down-arrow.png');
    background-position: 96% 50%;
    background-repeat: no-repeat;
    background-size: 14px;
    opacity: 0.7;
  }
`;