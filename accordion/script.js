const $accordionItems = $('.accordion-item');
const $accordionItemsTops = $('.accordion-item__top');
const $accordionItemsBottoms = $('.accordion-item__bottom');
const $accordionItemsBottomsContainers = $('.accordion-item__bottom-cont');
const $accordionItemsIconsRight = $('.accordion-item__icon-right');
const $accordionItemsIconsDown = $('.accordion-item__icon-down');

function handleAccordion(){

  const paddingTopAndBottom = 40;
  const hiddenClass = 'hidden';

  // initially open the first one
  const first = $accordionItems.eq(0);

  // calculate height for the first one
  const firstBottomContainerHeight = first.find($accordionItemsBottomsContainers).height() + paddingTopAndBottom;

  first.find($accordionItemsBottoms)
    .addClass('opened')
    .css({'height': firstBottomContainerHeight, 'transition': 'initial'});
  first.find($accordionItemsIconsRight).addClass(hiddenClass);
  first.find($accordionItemsIconsDown).removeClass(hiddenClass);

  // transition of first element is first turned off and than turned on again after page has loaded to prevent transition on page load:
  $( window ).on( "load", function() { first.find($accordionItemsBottoms).css({'transition': 'all 1s'}) })

   // control opening-closing on click
   $accordionItems.each(function(){

  const thisTop = $(this).find($accordionItemsTops);
  const thisBottom = $(this).find($accordionItemsBottoms);
  const thisAccordionItemsIconRight = $(this).find($accordionItemsIconsRight);
  const thisAccordionItemsIconDown = $(this).find($accordionItemsIconsDown);

  // calculate height based on content's height - including padding
  const thisBottomContainer = $(this).find($accordionItemsBottomsContainers);
  const thisBottomContainerHeight = thisBottomContainer.height() + paddingTopAndBottom;

            thisTop.on('click', () => {

                if (!thisBottom.hasClass('opened')) {
                    thisBottom
                        .addClass('opened')
                        .css({'height': thisBottomContainerHeight});
                    thisAccordionItemsIconRight.addClass(hiddenClass);
                    thisAccordionItemsIconDown.removeClass(hiddenClass);

                } else {
                    thisBottom
                        .removeClass('opened')
                        .css({'height': 0});
                    thisAccordionItemsIconRight.removeClass(hiddenClass);
                    thisAccordionItemsIconDown.addClass(hiddenClass);
                }
                
            })

        })

    };

handleAccordion();