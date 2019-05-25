import React from 'react';
import { 
    FaSearch as SearchIcon, 
    FaChevronLeft as LeftArrowIcon, 
    FaChevronRight as RightArrowIcon,
    FaPlus as PlusIcon,
    FaMinus as MinusIcon
} from 'react-icons/fa';

const styles = {
    btnSecondary : {
      "margin": "0px 2px 2px 0px",
      "textAlign": "center",
      "background": "#ed2553",
      "padding": "8px 10px",
      "fontSize": "16px",
      "cursor": "pointer",
      "border": "1px solid white",
      "outline": "none",
      "color": "#ffffff",
      "textDecoration": "none"
    },
    Text : {
        "margin": "0px 2px 2px 0px",
        "textAlign": "center",
        "padding": "8px 10px",
        "fontSize": "16px",
        "color": "#ffffff",
        "textDecoration": "none",
        "display": "inline-block"
    },
    Input : {
        "fontSize": "16px",
        "width": "35px",
        "height": "32px",
        "margin": "0px 2px 0 0",
        "display": "inline-block",
        "textAlign": "center",
        "backgroundColor": "#525863",
        "border": "0px",
        "color": "white",
        "marginLeft": "60px"
      }
  }

class ReactPDF_Header extends React.PureComponent {
    render() {
        const { showIconOnly, showTextOnly, totalPages, pageNo, handleSearchClick, handleNextClick, handlePrevClick } = this.props.config;
        return (
            <div id="pv-id-header-container" className="pv-header-container">
                <h4>React PDF Viewer</h4>
                <button className="btn-secondary like-review" style={styles.btnSecondary} onClick={handleSearchClick}>
                {
                    // Show Icon Only
                    (!showTextOnly) ? <SearchIcon/> : null
                }
                {
                    // Show Icon Only
                    (!showIconOnly) ? `Search` : null
                }
                </button>
                <button className="btn-secondary like-review" style={styles.btnSecondary} onClick={handlePrevClick}>
                {
                    // Show Icon Only
                    (!showTextOnly) ? <LeftArrowIcon/> : null
                }
                {
                    // Show Icon Only
                    (!showIconOnly) ? `Previous` : null
                }
                </button>
                <button className="btn-secondary like-review" style={styles.btnSecondary} onClick={handleNextClick}>
                {
                    // Show Icon Only
                    (!showTextOnly) ? <RightArrowIcon/> : null
                }
                {
                    // Show Icon Only
                    (!showIconOnly) ? `Next` : null
                }
                </button>

                <button className="btn-secondary like-review" style={styles.btnSecondary}>
                {
                    // Show Icon Only
                    (!showTextOnly) ? <PlusIcon/> : null
                }
                {
                    // Show Icon Only
                    (!showIconOnly) ? `Zoom In` : null
                }
                </button>
                <button className="btn-secondary like-review" style={styles.btnSecondary}>
                {
                    // Show Icon Only
                    (!showTextOnly) ? <MinusIcon/> : null
                }
                {
                    // Show Icon Only
                    (!showIconOnly) ? `Zoom Out` : null
                }
                </button>
                <input type="number" value={pageNo} style={styles.Input}/>
                <div style={styles.Text}> of {totalPages}</div>
            </div>
        )
    }
}

export default ReactPDF_Header;