jQuery(document).ready(function($){

    const accordionScript = {
  
      cacheDOM: function(){
    
          this.$accordionItems = $('.accordion-item');
          this.$accordionItemsTops = $('.accordion-item__top');
          this.$accordionItemsBottoms = $('.accordion-item__bottom');
          this.$accordionItemsBottomsContainers = $('.accordion-item__bottom-cont');
          this.$accordionItemsIconsRight = $('.accordion-item__icon-right');
          this.$accordionItemsIconsDown = $('.accordion-item__icon-down');
          
      },
  
      handleAccordion: function(){
  
          const that = this;
          const paddingTopAndBottom = 40;
          const transitionDuration = 1000;
          const hiddenClass = 'hidden';
          const itemInitiallyOpenedClass = 'accordion-item--initialy-opened';
          const itemOpenedClass = 'accordion-item--opened';
          const transistionTurnedOffClass = 'transition-none';

          const toggleBottom = (thisItem, action) => {
  
              const thisBottom = thisItem.find(that.$accordionItemsBottoms);
              const thisItemIconRight = thisItem.find(that.$accordionItemsIconsRight);
              const thisItemIconDown = thisItem.find(that.$accordionItemsIconsDown);
  
              // calculate height based on content's height - including padding
              const thisBottomContainer = thisItem.find(that.$accordionItemsBottomsContainers);
              const thisBottomContainerHeight = thisBottomContainer.height() + paddingTopAndBottom;
  
              if (action === 'open' || action === 'open-on-init') {
                  // opening bottom

                  // for initially opened items, prevent transition on page load
                  action === 'open-on-init' && thisBottom.addClass(transistionTurnedOffClass);
  
                  thisBottom
                  .addClass(itemOpenedClass)
                  .css({'height': thisBottomContainerHeight});
                  thisItemIconRight.addClass(hiddenClass);
                  thisItemIconDown.removeClass(hiddenClass);
                  // add bottom border on last element
                  if ( thisItem.is(':last-child') ) {
                      thisBottom.css({'border-bottom': '1px solid rgb(112,112,112)'})
                      // add again after transition (this is a fix for conflict caused by closing all others)
                      setTimeout(() => {
                        thisBottom.css({'border-bottom': '1px solid rgb(112,112,112)'})
                    }, transitionDuration)
                  }

                  // restore transition for initially opened items
                  action === 'open-on-init' && setTimeout(() => thisBottom.removeClass(transistionTurnedOffClass), 1000);
  
              } else {
                  // action === 'close' - closing bottom
  
                  thisBottom
                  .removeClass(itemOpenedClass)
                  .css({'height': 0});
                  thisItemIconRight.removeClass(hiddenClass);
                  thisItemIconDown.addClass(hiddenClass);
                
                  // remove border on last item after transistion is finished:
                  if ( thisItem.is(':last-child') ) {
                      setTimeout(() => {
                          thisBottom.css({'border-bottom': '0'})
                      }, transitionDuration)
                  }
              }
  
          } // toggleBottom function end
              
          this.$accordionItems.each(function(){
        
              const thisItem = $(this);
              const thisTop = thisItem.find(that.$accordionItemsTops);
              const thisBottom = thisItem.find(that.$accordionItemsBottoms);
  
              
              // items with proper class (selected by user in admin panel) are initially opened:
              thisItem.hasClass(itemInitiallyOpenedClass) && toggleBottom(thisItem, 'open-on-init');
            
              // others are opened / closed on click:
              thisTop.on('click', () => {
  
                  if ( !thisBottom.hasClass(itemOpenedClass) ) {

                      // first close all items:
                      that.$accordionItems.each(function(){ toggleBottom($(this), 'close') });
                      // than open current item:
                      toggleBottom(thisItem, 'open')
  
                  } else { toggleBottom(thisItem, 'close') }
  
              })
        
          }) // each end
        
        },
    
        // initialization
        init: function(){
            this.cacheDOM();
            this.handleAccordion()     
        }
  
    } // accordionScript end
  
    accordionScript.init();

})