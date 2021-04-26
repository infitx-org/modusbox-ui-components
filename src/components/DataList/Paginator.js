import './Paginator.scss';

import PropTypes from 'prop-types';
import React from 'react';

import ControlIcon from '../ControlIcon';

function Page({ content, selected, disabled, onClick }) {
  const cl = ['noselect', 'el-paginator__page'];
  if (selected) {
    cl.push('el-paginator__page--selected');
  }
  if (disabled) {
    cl.push('el-paginator__page--disabled');
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={cl.join(' ')} onClick={onClick} disabled role="button">
      {content}
    </div>
  );
}

Page.defaultProps = {
  content: '1',
  selected: false,
  disabled: false,
  onClick: undefined,
};

Page.propTypes = {
  content: PropTypes.string,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

function Paginator({ selectedPage, onPageClick, pages, count }) {
  const minimumPagesToShow = Math.min(pages, count);
  const bySide = Math.round((minimumPagesToShow - 1) / 2);
  const minStart = Math.max(selectedPage - bySide, 1);
  const maxStart = pages - minimumPagesToShow + 1;
  const offset = Math.min(minStart, maxStart);
  const indexes = new Array(minimumPagesToShow)
    .fill(0)
    .map((_, index) => offset + index)
    .map((p, index, arr) => {
      if (index === 0) {
        return 1;
      }
      if (index === arr.length - 1) {
        return pages;
      }
      if (index === 1 && p !== 2) {
        return '...';
      }
      if (index === arr.length - 2 && p !== pages - 1) {
        return '...';
      }
      return p;
    });

  const isFirst = selectedPage === 1;
  const isLast = selectedPage === pages;

  return (
    <div className="el-paginator">
      <ControlIcon
        size={16}
        icon="arrow"
        className="el-paginator__button el-paginator__button__left"
        onClick={() => onPageClick(isFirst ? 1 : selectedPage - 1)}
        disabled={isFirst}
      />
      <div className="el-paginator__pages">
        {indexes.map((p, index) => {
          const selected = p.toString() === selectedPage.toString();
          return (
            <Page
              key={index.toString()}
              content={p.toString()}
              selected={selected}
              disabled={typeof p !== 'number'}
              onClick={typeof p === 'number' ? () => onPageClick(p) : undefined}
            />
          );
        })}
      </div>
      <ControlIcon
        size={16}
        icon="arrow"
        className="el-paginator__button"
        onClick={() => onPageClick(isLast ? pages : selectedPage + 1)}
        disabled={isLast}
      />
    </div>
  );
}

Paginator.defaultProps = {
  selectedPage: 0,
  onPageClick: undefined,
};

Paginator.propTypes = {
  onPageClick: PropTypes.func,
  selectedPage: PropTypes.number,
  count: PropTypes.number.isRequired,
};

export default Paginator;
